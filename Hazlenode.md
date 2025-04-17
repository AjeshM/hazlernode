This will an installble Frappe App similar to n8n

Once you install it, the user should be able to automate stuff!!!

Move out of server-script and webhooks 

## Use Cases
* Send a telegram message on creation of a doc.
* Send a HTTP request to GitHub
* Recieve a webhook from Stripe and create a payment entry to doc and then send a message on Raven
* Send a Raven message
* Send salary slip to Raven channel

## Scope

Views:
* Track Workflow runs
* List of Workflows

Nodes:

[TRIGGER]
* Document Event
* Scheduler Event / CRON
* Webhook

[ACTIONS]
* HTTP Request
* Send Email
* CRUD Documents
* Telegram

## 3rd Party Nodes

---
Defined in Hooks.py
---

* Send a Raven Message
* Send salary slip to Raven channel

```Python
extend_hazelnodes = {
  "Raven":"raven_app.extends.nodes.Raven"
}
```
## Resources
https://github.com/The-Commit-Company/frappe-types (Generate Frappe Types for the apps)

https://reactflow.dev/learn

https://ui.shadcn.com/docs/components/sonner

https://catalyst.tailwindui.com/docs/badge

https://github.com/st4l1nR/catalyist-ui-kit  ( Catalyst UI free download)

https://github.com/pmndrs/zustand

https://redux-toolkit.js.org

✅ Frappe Framework

✅ React

✅ TypeScript

## Good Practices
* UI/UX Polished
* Write tests! (Unit tests and Integration tests)
* Use TS properly (Any!)
* Use a state management solution 
* Keep a deploy instance on FC
* CI / Linting Setup
  * Ruff Setup (Py)
  * Prettier (JS)

## Side Stuff
* Have a documentation going
* Readme and stuff
* Issue Tracking
* Channel cord discord

## Later Point [Advanced]
* Script Nodes (Python/JS)
* Flow Nodes (IF/ELSE, LOOP/Batch etc..)
* Trigger one workflow from another

## DocTypes
1. ✅ Hazler Workflow
    * ✅ Nodes (related to nodes) (Child Table)
    * Connections (basically edges)(Object)
    * ✅ Enabled?
2. ✅ Hazler Node Type
    * ✅ Name
3. ✅ Hazler Node
    * ✅ ID
    * ❓ Type (`input`,`output`)
    * ✅ Hazle Node Type (Hazle Node Type)
    * ✅ Position X
    * ✅ Position Y
    * 
3. ✅ Hazler Workflow Execution
    * ✅ Status
    * Execution Time
    * ✅ Hazler Workflow
    * 🟨 Copy of the Hazler Workflow at the time of execution
4. Hazler Variable
    * Accessible across all workflow
    * 

## E28
* Zapier Review
* Get Auth Working, Redirect to Frappe's Login
* React Query + some kind of basic state management for user
* A template?

## E29
* Base DocTypes
* user flow / lo-fi wireframes

---
### BTS
* Something analogous to createListResource, createDocumentResource
* Status of Frappe API 2
---

## E30
* List of workflows
* Individual workflow

#### Checking login
```javascript
export function sessionUser() {
  const cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
  let _sessionUser = cookies.get('user_id')
  if (_sessionUser === 'Guest') {
    _sessionUser = null
  }
  return _sessionUser
}
```
## Usefull Command
```
* cur_frm.doc
* 