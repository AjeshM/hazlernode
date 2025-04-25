# Copyright (c) 2025, Ajesh Jagdish Meshram and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class HazlerWorkflow(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from hazlernode.hazlernode.doctype.hazler_node.hazler_node import HazlerNode

		enabled: DF.Check
		name: DF.Int | None
		nodes: DF.Table[HazlerNode]
		title: DF.Data
	# end: auto-generated types
	pass
