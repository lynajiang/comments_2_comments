import os
import psycopg2

# Create a cursor.
pg_conn_string = os.environ["PG_CONN_STRING"]

connection = psycopg2.connect(pg_conn_string)


# Set to automatically commit each statement
connection.set_session(autocommit=True)

cursor = connection.cursor()

#Columns
#show_id, type, title, director, cast, country, date_added, release_year, rating, duration

cursor.execute(
    "CREATE TABLE netflix_titles (show_id STRING, type STRING, title STRING, director STRING, cast_cast STRING, country STRING, rating STRING, duration STRING)"
)

with open("netflix_titles.csv", "r") as f:
    lines = f.readlines()
  
    # Print the column names
    first_line = lines[0].strip().split(',')
    print(first_line[0], first_line[1], first_line[2],
    first_line[3], first_line[4], first_line[5], first_line[8], first_line[9])
  
    for line in lines[1:100]:
        parts = line.strip().split(',')
      
        print(parts[0], parts[1], parts[2], 
        parts[3], parts[4], parts[5], parts[8], parts[9])

        cursor.execute(
            "INSERT INTO netflix_titles VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (parts[0], parts[1], parts[2],
        parts[3], parts[4], parts[5], parts[8], parts[9]))
