```mermaid
flowchart LR
  subgraph Client
    A[Mobile App (iOS/Android)] 
    B[Web App (React)]
  end

  subgraph API
    C[Backend REST / GraphQL API]
    C --> D[Auth Service (JWT / Refresh tokens)]
    C --> E[Export Service (PDF/Excel renderer)]
    C --> F[Share Service (generate shareable assets)]
  end

  subgraph DB
    G[(Primary DB - MongoDB/Postgres)]
    H[(File Storage - S3 / Cloud Storage)]
  end

  subgraph Admin
    I[Admin Dashboard]
  end

  A -->|HTTPS| C
  B -->|HTTPS| C
  C -->|Read/Write| G
  C -->|Store files| H
  C -->|Serve metrics| I



```
