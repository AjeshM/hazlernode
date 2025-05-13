from typing import Optional

import frappe


# Ajesh note frappe.job.cron_format not working so we have done workaround
def retrieve_job_cron_fromat():
    scheduled_job_name = (
        "hazler_schedule_handler.handle"  # Replace with the actual name
    )
    try:
        scheduled_job = frappe.get_doc("Scheduled Job Type", scheduled_job_name)
        cron_format = scheduled_job.cron_format
        return cron_format
    except frappe.DoesNotExistError:
        frappe.log_error(f"Scheduled Job Type '{scheduled_job_name}' not found.")
    except Exception as e:
        frappe.log_error(f"Error retrieving Scheduled Job Type: {e}")


def handle():
    frappe.job.cron_format
    # HazlerScheduleHandler(frappe.job.cron_format).handle()
    HazlerScheduleHandler(retrieve_job_cron_fromat()).handle()


class HazlerScheduleHandler:
    def __init__(
        self,
        cron_expression: Optional[str] = None,
    ):
        self.cron_expression = cron_expression

    def handle(self):
        enabled_schedule_event_workflows = frappe.db.get_all(
            "Hazler Workflow",
            filters={"enabled": 1, "trigger_type": "Schedule Event"},
            fields=["name", "trigger_config"],
        )
        for wf in enabled_schedule_event_workflows:
            wf.trigger_config = frappe.parse_json(wf.trigger_config)
            self.execute_workflow_if_applicable(wf.name, wf.trigger_config)

    def execute_workflow_if_applicable(self, wf_name, wf_trigger_config):
        cron_expression = wf_trigger_config.get("cron_expression")

        if cron_expression != self.cron_expression:
            return

        context = frappe._dict({"cron_expression": cron_expression})

        frappe.log_error("Executing workflow: ", wf_name)

        frappe.enqueue_doc(
            "Hazler Workflow",
            wf_name,
            "execute",
            queue="long",
            context=context,
        )
