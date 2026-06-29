# 🛡️ Security Policy

> *Because even in production, we prefer quiet dashboards.*

The **Works in Prod** project is a public, educational prototype —  
a demonstration of observability, clarity, and humor.  
That means security here is mostly about **respect, transparency, and good hygiene**, not enterprise-grade hardening.

Still, if you spot a real issue, please handle it thoughtfully.

---

## 🧠 Supported Versions

This is an open demo environment with no active release cycle.  
Security-related fixes will be applied **as time and relevance allow**.

| Version            | Supported                      |
| ------------------ | ------------------------------ |
| `main` (live site) | ✅ Yes                          |
| other branches     | 🧪 Experimental — no guarantees |

---

## 🕵️ Reporting a Vulnerability

If you believe you’ve found a vulnerability — code, config, or data exposure —  
please **don’t open a public issue**. Instead:

1. Email **jerusha.gray@protonmail.com** (or your preferred secure contact).  
2. Include:
   - A short description of the problem.  
   - Steps to reproduce (if possible).  
   - Why you believe it’s a security concern.  
3. Please allow a few days for review and response.

---

## 🧩 Responsible Disclosure

If the report is valid and verified:
- You’ll receive acknowledgment and credit (if you wish).  
- The issue will be quietly patched or documented.  
- Public notes or commits will reference the fix only after mitigation.

---

## ⚙️ Notes & Expectations

- This project doesn’t handle sensitive data or user accounts.  
- No authentication or payment layers are present.  
- Use your own Supabase instance — never share credentials.  
- All `.env.local` files are excluded from GitHub via `.gitignore`.  

---

## 🪶 Closing Thought

Security, like systems, is a living thing — calm when tended to, noisy when ignored.  
If you help keep *Works in Prod* quietly stable, thank you.

> *Ship safely. Sleep soundly. Monitor lightly.*  
> — **Jerusha Gray**
