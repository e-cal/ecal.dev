#!/usr/bin/env bash

pip install -r requirements.txt
uvicorn src.main:app --host 0.0.0.0 --port 8000
