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
        delta = diffs.deltas[tripID][stopID]
        return delta
    except:
        return "Invalid trip ID or stop ID", 400

def generate_knn():
    if os.path.isfile("index.pickle"):
        with open('index.pickle') as f:
            diffs = pickle.load(f)

    else:
        df = pd.read_csv("scrape/responses.csv")
        diffs = deltas.generate_deltas(df)
        with open('index.pickle','w') as f:
            pickle.dump(diffs, f)

    return diffs

diffs = generate_knn()
