# Copyright (c) 2025, Ajesh Jagdish Meshram and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class HazlerNodeEventType(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from hazlernode.hazlernode.doctype.hazler_event_param.hazler_event_param import HazlerEventParam

		name: DF.Int | None
		node_type: DF.Link
		params: DF.Table[HazlerEventParam]
		title: DF.Data
	# end: auto-generated types
	pass
