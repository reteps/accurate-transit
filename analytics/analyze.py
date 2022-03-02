import pandas as pd
import glob
import json
import geopandas as gpd
import shapely


def generate_entries():
    for filename in glob.glob("scrape/responses/*.json"):
        with open(filename) as f:
            try:
                data = json.load(f)

                time = data["time"]
                for vehicle in data["vehicles"]:
                    vehicle["captured_at"] = time

                    vehicle |= vehicle["trip"]
                    del vehicle["trip"]
                    if (
                        vehicle["location"]["lat"] != 0
                        and vehicle["location"]["lon"] != 0
                    ):
                        yield vehicle

            except json.JSONDecodeError:
                pass


def generate_csv():
    df = pd.DataFrame(generate_entries())
    df.to_csv("scrape/responses.csv")

if __name__ == "__main__":
    generate_csv()