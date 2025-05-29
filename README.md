

<!-- application folder structure -->
face_unlock_api/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── register.py
│   │   │   └── unlock.py
│   │   └── router.py
│   ├── core/
│   │   └── config.py
│   ├── services/
│   │   ├── face_service.py
│   ├── models/
│   │   └── user_face.py
│   ├── utils/
│   │   └── file_utils.py
│   └── main.py
├── face_data/  ← stored face encodings
├── requirements.txt
└── README.md


<!-- to start the application -->
uvicorn app.main:app --reload