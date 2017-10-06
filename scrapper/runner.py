import sys
from dispatcher import dispatch
import base64
from termcolor import colored

if __name__ == "__main__":

    hotels = [
        {
        "name":"resort rio arpora",
        "roomType": "7"
        },
        # {
        # "name":"taj aguada goa",
        # "roomType": "7"
        # },
        # {
        # "name":"mariot goa",
        # "roomType": "7"
        # }
    ]

    payload = {'hotels':hotels}
    dispatch(payload,{})
