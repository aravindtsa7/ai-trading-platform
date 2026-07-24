# User Model Design

## Purpose

Represents a registered user of the AI Trading Platform.

---

## Fields

### id
Unique identifier.

Type:
String (CUID)

---

### firstName

User's first name.

Required

---

### lastName

User's last name.

Required

---

### email

Unique email address.

Required

Unique

---

### passwordHash

Encrypted password.

Required

---

### phone

Mobile number.

Optional

---

### role

Possible values:

- ADMIN
- USER

Default:

USER

---

### status

Possible values:

- ACTIVE
- INACTIVE
- SUSPENDED

Default:

ACTIVE

---

### emailVerified

Boolean

Default:

false

---

### lastLoginAt

Stores last successful login.

Optional

---

### createdAt

Automatically generated.

---

### updatedAt

Automatically updated.