# Copyright (c) 2025, Ajesh Jagdish Meshram and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class HazlerWorkflow(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF
        from hazlernode.hazlernode.doctype.hazler_node.hazler_node import (
            HazlerNode,
        )

        enabled: DF.Check
        name: DF.Int | None
        nodes: DF.Table[HazlerNode]
        title: DF.Data

    # end: auto-generated types

    def validate(self):
        self.validate_first_node_is_trigger_node()
        self.validate_only_one_trigger_node()

    def validate_first_node_is_trigger_node(self):
        if not self.nodes[0].kind == "Trigger":
            frappe.throw("First node in workflow must be a trigger")

    def validate_only_one_trigger_node(self):
        if list(n.kind for n in self.nodes).count("Trigger") > 1:
            frappe.throw("There must be only one trigger node in workflow")

    def execute(self, context=None):
        execution_log = frappe.new_doc("Hazler Workflow Execution Log")
        execution_log.workflow = self.name
        # execution_log.status = "Running"
        try:
            for node in self.nodes[1:]:
                print("executing: ", node, node.type, node.event)
                parameters = frappe.parse_json(node.parameters)
                context = node.execute(parameters, context)

            execution_log.status = "Running"

        except Exception:
            execution_log.status = "Failed"

        finally:
            execution_log.insert(ignore_permissions=True)
            execution_log.submit()


# Send an email

# 1. sales invoice gets created
# 2. workflow gets triggered
# 3.
