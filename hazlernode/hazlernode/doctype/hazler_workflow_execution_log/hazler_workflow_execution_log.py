# Copyright (c) 2025, Ajesh Jagdish Meshram and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class HazlerWorkflowExecutionLog(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF
        from hazlernode.hazlernode.doctype.hazler_execution_node_log.hazler_execution_node_log import HazlerExecutionNodeLog

        amended_from: DF.Link | None
        initial_context: DF.Code | None
        name: DF.Int | None
        node_logs: DF.Table[HazlerExecutionNodeLog]
        status: DF.Literal["Success", "Failed", "Running"]
        traceback: DF.Code | None
        trigger_config: DF.Code | None
        trigger_type: DF.Data | None
        workflow: DF.Link
        workflow_title: DF.Data | None
    # end: auto-generated types
    pass
