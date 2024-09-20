import pandas as pd
from pymongo import MongoClient
from pymongo.errors import ConfigurationError, OperationFailure

# Učitavanje CSV datoteka
listings_detailed_df = pd.read_csv('listings_detailed.csv')
listings_df = pd.read_csv('listings.csv')
calendar_df = pd.read_csv('calendar_4.csv')
reviews_df = pd.read_csv('reviews.csv')
reviews_detailed_df = pd.read_csv('reviews_detailed.csv')

# Kreiranje tabele listings_detailed_final

# Filtriranje calendar_df po obeležju available
calendar_filtered_df = calendar_df[calendar_df['available'] == 't'][['listing_id', 'date']]

# Grupisanje date po listing_id, i pretvaranje datuma u listu available_dates
grouped_dates = calendar_filtered_df.groupby('listing_id')['date'].apply(list).reset_index(name='available_dates')

# Spajanje tabele listings_detailed_df i grouped_dates
merged_detailed_df = pd.merge(listings_detailed_df, grouped_dates, left_on='id', right_on='listing_id', how='left')

# Izbacivanje obeležja listing_id iz tabele
merged_detailed_df.drop(columns=["listing_id"], inplace=True)

# Konvertovanje DataFrame-a u listu rečnika
listings_detailed_final_data = merged_detailed_df.to_dict(orient='records')

# Kreiranje tabele listings_final

# Spajanje tabela listings_df i grouped_dates
merged_df = pd.merge(listings_df, grouped_dates, left_on='id', right_on='listing_id', how='left')

# Izbacivanje obeležja listing_id iz tabele
merged_df.drop(columns=["listing_id"], inplace=True)

# Izračunavanje prosečne cene po neighbourhood-u
average_prices_df = merged_df.groupby('neighbourhood')['price'].mean().reset_index()
average_prices_df.rename(columns={'price': 'avg_price'}, inplace=True)

# Spajanje sa tabelom merged_df
final_df = pd.merge(merged_df, average_prices_df, on='neighbourhood')

# Konvertovanje DataFrame-a u listu rečnika
listings_final_data = final_df.to_dict(orient='records')

# Konvertovanje reviews i reviews_detailed DataFrame-ova u liste rečnika
reviews_data = reviews_df.to_dict(orient='records')
reviews_detailed_data = reviews_detailed_df.to_dict(orient='records')

# Povezivanje sa MongoDB bazom podataka
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase_optimized']

# Funkcija za ubacivanje podataka u MongoDB bazu podataka

def insert_data_to_mongo(data, collection_name):
    try:
        collection = db[collection_name]
        collection.insert_many(data)
        print(f"Data inserted successfully into {collection_name}")
    except ConfigurationError as ce:
        print(f"Could not connect to MongoDB: {ce}")
    except OperationFailure as oe:
        print(f"Could not insert data into {collection_name}: {oe}")

# Ubacivanje baza podataka u MongoDB bazu pomoću funkcije insert_data_to_mongo
insert_data_to_mongo(listings_detailed_final_data, 'listings_detailed_final')
insert_data_to_mongo(listings_final_data, 'listings_final')
insert_data_to_mongo(reviews_data, 'reviews')
insert_data_to_mongo(reviews_detailed_data, 'reviews_detailed')
