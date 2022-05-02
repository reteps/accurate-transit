#!/usr/bin/env python3
from flask import Flask
import deltas
import analyze
import pandas as pd
import pickle
import os

app = Flask(__name__)

@app.route('/')
def root():
    return 'Analytics service running!'

@app.route('/trip/<tripID>/stop/<stopID>')
def timeToBusAtStop(tripID, stopID):
    try:
        deltas = diffs.deltas[tripID][stopID]
        time_deltas = [x for _, x in deltas]
        return str(pd.Series(time_deltas).median())
    except:
        return "Invalid trip ID or stop ID", 400

def generate_knn():
    if os.path.isfile("index.pickle"):
        with open('index.pickle', 'rb') as f:
            diffs = pickle.load(f)

    else:
        df = pd.read_csv("scrape/responses.csv")
        diffs = deltas.generate_deltas(df)
        with open('index.pickle','wb') as f:
            pickle.dump(diffs, f)

    return diffs
diffs = generate_knn()

