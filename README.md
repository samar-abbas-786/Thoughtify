```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor": "#f0f0f0", "edgeLabelBackground":"#ffffff"}}}%%
erDiagram
USERS {
    ObjectId _id PK
    string name
    string email
    string passwordHash
    date createdAt
}
SAVED_PLANS {
    ObjectId _id PK
    ObjectId userId FK
    string source
    string destination
    number budget
    array tripOptions
    string selectedPlan
    date createdAt
}
USERS ||--o{ SAVED_PLANS : "has"


```
