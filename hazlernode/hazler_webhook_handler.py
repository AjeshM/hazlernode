from typing import Optional

import frappe
from werkzeug.wrappers import Response


class HazlerWebhookHandler:
    def __init__(self, path: str, status_code: Optional[int] = None):
        self.path = path
        self.webhook_id = None

    def can_render(self):
        print(self.path)
        if not self.path.startswith("hazlernode_webhooks/"):
            return False

        self.webhook_id = self.path.split("/")[-1]

        return frappe.db.exists("Hazler Webhook Listener", self.webhook_id)

    def render(self):
        linked_workflow = frappe.db.get_value(
            "Hazler Webhook Listener", self.webhook_id, "workflow"
        )
        frappe.get_doc("Hazler Workflow", linked_workflow).execute()
        return Response(f"Handler from hazlernode:{self.webhook_id}")
