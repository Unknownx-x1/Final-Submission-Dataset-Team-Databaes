from fastapi import FastAPI, HTTPException
import requests


#GETTING JSON from ML model

EXTERNAL_API_URL = "https://smart-home-agent.onrender.com/state"

def fetch_decision():
    try:
        response = requests.get(EXTERNAL_API_URL, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Error fetching data from smart-home-agent: {str(e)}"
        )
print(fetch_decision())