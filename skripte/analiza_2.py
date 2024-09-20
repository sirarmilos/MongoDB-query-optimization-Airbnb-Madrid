import pandas as pd

calendar = pd.read_csv('calendar.csv')

listings = pd.read_csv('listings.csv')
listings_detailed = pd.read_csv('listings_detailed.csv')
neighbourhoods = pd.read_csv('neighbourhoods.csv')
reviews = pd.read_csv('reviews.csv')
reviews_detailed = pd.read_csv('reviews_detailed.csv')

calendar_4 = pd.read_csv('calendar_4.csv')

print(listings.shape)
print(listings_detailed.shape)
print(neighbourhoods.shape)
print(reviews.shape)
print(reviews_detailed.shape)

# Kreiranje kolekciju calendar_2 i calendar_3 sa ciljem da se uradi šablon podskupa kolekcije calendar
# Pošto su oni bili i dalje preveliki, odlučilo se za kolekciju calendar_4, koja uzima 1 mesec unapred iz kolekcije calendar, i nad njom se vršili dalja analiza 

print(calendar.shape)
calendar_2 = calendar[calendar['date'] < "2021-06-13"]
print(calendar_2.shape)
calendar_2.to_csv("calendar_2.csv", index=False)

calendar_3 = calendar[calendar['date'] < "2021-04-14"]
print(calendar_3.shape)
calendar_3.to_csv("calendar_3.csv", index=False)

# calendar_4, koji je korišćen u nastavku projekta

calendar_4 = calendar[calendar['date'] < "2021-05-13"]
print(calendar_4.shape)
calendar_4.to_csv("calendar_4.csv", index=False)
print(calendar_4[calendar_4["date"] < "2021-05-13"])

# neke provere koje su rađene da bi se videla tačnost upita
# ovaj deo nije nešto što je potrebno za sam projekat, ali je ostavljeno jer je proveravano, a i rađeno

print(listings_detailed.bathrooms_text.unique())
print(listings_detailed.bedrooms.unique())
print(listings_detailed.host_response_time.unique())
print(listings_detailed.host_response_rate.unique())
print()

# provera za upit 3
calendar_4_filtrirano = calendar_4[calendar_4["date"] == "2021-05-01"]
print(calendar_4.shape)
print(calendar_4_filtrirano.shape)
print(calendar_4_filtrirano.available.unique())

c = calendar_4_filtrirano[calendar_4_filtrirano["available"] == "t"]
print(calendar_4_filtrirano[calendar_4_filtrirano["available"] == "t"].shape)
print(calendar_4_filtrirano[calendar_4_filtrirano["available"] == "f"].shape)

a = listings_detailed[listings_detailed["bathrooms_text"].isin(["1 shared bath", "1 bath", 
                    "1 private batch", "1.5 shared baths", "2 baths", "2 shared baths"])]

b = a[a["bedrooms"].isin([1, 2])]

nova = pd.merge(c, b, left_on = "listing_id", right_on = "id")

print(nova)
print(nova.dtypes)
print(nova.shape)

# provera za upit 5
print()
print(reviews_detailed.shape)
print(len(reviews_detailed.listing_id.unique()))

d = reviews_detailed[reviews_detailed["date"] >= "2020-04-12"]
d = d[d["date"] <= "2021-04-12"]

print(d.shape)
print(len(d.listing_id.unique()))
print()

print(listings_detailed[listings_detailed["neighbourhood_cleansed"] == "Sol"])
print(listings_detailed.room_type.unique())
print(listings[listings["price"] > 100].price)

# provera za upit 2
print()
print()

cc = calendar_4_filtrirano[calendar_4_filtrirano["available"] == "t"]
cc = cc[cc["date"] >= "2021-05-01"]
cc = cc[cc["date"] <= "2021-05-02"]

print(calendar_4_filtrirano[calendar_4_filtrirano["available"] == "t"].shape)
aa = listings[listings["price"] > 100]
nova = pd.merge(cc, aa, left_on = "listing_id", right_on = "id")
print(nova)
print()

