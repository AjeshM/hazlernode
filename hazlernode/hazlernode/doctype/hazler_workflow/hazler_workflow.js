// Copyright (c) 2025, Ajesh Jagdish Meshram and contributors
// For license information, please see license.txt

frappe.ui.form.on("Hazler Workflow", {
  refresh(frm) {
    frm.set_query("trigger_type", () => {
      return {
        filters: { "kind": "Trigger" }
      }
    })
  },
});
