// Copyright (c) 2025, Ajesh Jagdish Meshram and contributors
// For license information, please see license.txt

frappe.ui.form.on("Hazler Webhook Listener", {
  refresh(frm) {
    frm.set_intro(
      `<strong>Webhook Endpoint: </strong><a target="_blank" href="/hazlernode_webhooks/${frm.doc.name}">${frappe.boot.sitename}/hazlernode_webhooks/${frm.doc.name}</a>`,
      "yellow"
    );
  },
});
