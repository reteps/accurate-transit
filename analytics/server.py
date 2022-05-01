#!/usr/bin/env python3
from flask import Flask
import deltas
import analyze

app = Flask(__name__)


@app.route('/')
def root():
    return 'Analytics service running!'


@app.route('/trip/<tripID>/stop/<stopID>')
def timeToBusAtStop(tripID, stopID):
    diffs = deltas.generate_deltas(analyze.generate_entries())
    try:
        delta = diffs.deltas[tripID][stopID]
        return delta
    except:
        return "Invalid trip ID or stop ID", 400
