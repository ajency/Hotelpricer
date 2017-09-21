import sys
from dispatcher import dispatch


if __name__ == "__main__":

    if(len(sys.argv) is 5):
        marketplace = sys.argv[1]
        items = sys.argv[2]
        group_id = sys.argv[3]
        batch_id = sys.argv[4]
        products = {
            marketplace:items
        }
        payload = {'products':products,'group_id':group_id,'batch_id':batch_id}
    else:
        products = {
            'amazon':"240#B06ZXSRSZ4,241#B01NATTJ64,242#B01NCV1KH2,243#B01H3540MI,244#B01KVDHYGI"
        }

        group_id = 15038979902192
        batch_id = 80428880224062

        payload = {'products':products,'group_id':group_id,'batch_id':batch_id}
    dispatch(payload,{})
