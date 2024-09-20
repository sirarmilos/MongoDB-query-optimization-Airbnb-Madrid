import pandas as pd
import json as js
from pymongo import MongoClient
from pymongo.errors import ConfigurationError, OperationFailure

calendar = pd.read_csv('calendar.csv')
listings = pd.read_csv('listings.csv')
listings_detailed = pd.read_csv('listings_detailed.csv')
neighbourhoods = pd.read_csv('neighbourhoods.csv')
reviews = pd.read_csv('reviews.csv')
reviews_detailed = pd.read_csv('reviews_detailed.csv')

calendar_4 = pd.read_csv('calendar_4.csv')

with open('neighbourhoods.geojson') as f:
    neighbourhoods_gj = js.load(f)

client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase_4']

def insert_dataframe_to_mongo(df, collection_name):
    try:
        collection = db[collection_name]
        if isinstance(df, pd.DataFrame):
            data_dict = df.to_dict('records')
            collection.insert_many(data_dict)
        elif isinstance(df, dict):
            collection.insert_one(df)
        print(f"Data inserted successfully into {collection_name}")
    except ConfigurationError as ce:
        print(f"Could not connect to MongoDB: {ce}")
    except OperationFailure as oe:
        print(f"Could not insert data into {collection_name}: {oe}")

dataframes = [
    (calendar, 'calendar'),
    (listings, 'listings'),
    (listings_detailed, 'listings_detailed'),
    (neighbourhoods, 'neighbourhoods'),
    (neighbourhoods_gj, 'neighbourhoods_gj'),
    (reviews, 'reviews'),
    (reviews_detailed, 'reviews_detailed'),
    (calendar_4, 'calendar_4')
]

for df, collection_name in dataframes:
    insert_dataframe_to_mongo(df, collection_name)
