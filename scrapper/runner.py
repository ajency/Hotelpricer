import sys
from dispatcher import dispatch


if __name__ == "__main__":

    hotels = [
        {
        'name':"vivanta goa",
        'roomType': "7"
        }
    ]

    payload = {'hotels':hotels}
    dispatch(payload,{})
