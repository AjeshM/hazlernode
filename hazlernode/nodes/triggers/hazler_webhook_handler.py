from typing import Optional

import frappe
from werkzeug.wrappers import Response


class HazlerWebhookHandler:
    def __init__(self, path: str, status_code: Optional[int] = None):
        self.path = path
        self.webhook_id = None
        self.request_obj = frappe.request

    def can_render(self):
        print(self.path)
        if not self.path.startswith("hazlernode_webhooks/"):
            return False

        self.webhook_id = self.path.split("/")[-1]

        return frappe.db.exists("Hazler Webhook Listener", self.webhook_id)

    def render(self):
        serializable_context = self.get_serializable_context()
        self.create_hazler_webhook_log(serializable_context)
        self.execute_workflow_with_context(serializable_context)
        return Response(f"Handler from hazlernode:{self.webhook_id}")

    def get_serializable_context(self):
        request_data = self.get_request_data()

        return {
            "request_headers": self.request_obj.headers,
            "request_data": request_data.decode(),
            "form_dict": frappe.form_dict,
        }

    def get_request_data(self):
        request_data = None
        if self.request_obj.is_json:
            request_data = self.request_obj.get_json()
        else:
            request_data = self.request_obj.get_data()

        return request_data

    def create_hazler_webhook_log(self, serializable_context):

        frappe.get_doc(
            {
                "doctype": "Hazler Webhook Log",
                "webhook": self.webhook_id,
                "context": frappe.as_json(serializable_context),
            }
        ).insert(ignore_permissions=True)

    def execute_workflow_with_context(self, serializable_context):
        context = frappe._dict(
            {"self.request_obj": self.request_obj, **serializable_context}
        )

        linked_workflow = frappe.db.get_value(
            "Hazler Webhook Listener", self.webhook_id, "workflow"
        )
        # Execute Workflow

        frappe.get_doc("Hazler Workflow", linked_workflow).execute(context)
