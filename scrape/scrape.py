import pandas as pd
import os
from ratelimiter import RateLimiter
import tqdm
import time
import subprocess

@RateLimiter(max_calls=1, period=60)
def run_command(command):
    subprocess.run(command, shell=True)

last_ran = time.time()

URL = "https://developer.cumtd.com/api/v2.2/JSON/getvehicles?key=6ef469a31b9141788431bafc53621b1c"

with tqdm.tqdm() as pbar:
    while True:
        current_time = time.time()
        command = f"wget -a scrape.log --warc-file=archives/{current_time} -O responses/{current_time}.json '{URL}'"
        if last_ran + 60 > current_time:
            time.sleep(current_time - last_ran)
        run_command(command)
        last_ran = current_time
        pbar.update()
