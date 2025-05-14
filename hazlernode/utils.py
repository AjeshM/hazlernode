import frappe


def cleanup_hazler_scheduled_events():
    hazler_events = frappe.db.get_all("Hazler Scheduled Event", pluck="name")

    for name in hazler_events:
        frappe.delete_doc("Hazler Scheduled Event", name)


def sync_hazler_scheduled_events():
    print("Hazlernode: Syncing scheduled events...")
    workflows_with_scheduled_triggers = frappe.db.get_all(
        "Hazler Workflow",
        filters={"trigger_type": "Schedule Event"},
        fields=["trigger_config"],
    )

    for wf in workflows_with_scheduled_triggers:
        trigger_config = frappe.parse_json(wf.trigger_config)
        cron_expression = trigger_config["cron_expression"]
        already_exists = frappe.db.exists(
            "Hazler Scheduled Event", {"cron_expression": cron_expression}
        )
        if already_exists:
            continue

        frappe.get_doc(
            doctype="Hazler Scheduled Event", cron_expression=cron_expression
        ).insert()
