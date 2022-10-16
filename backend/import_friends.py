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
    "CREATE TABLE friends_data (year_of_prod INT, season_num INT, \
    episode_num INT, episode_title STRING, \
    duration INT, summary STRING, director STRING, num_stars INT, \
    num_votes INT)"
)

with open("friends_episodes_v3.csv", "r", encoding="ISO-8859-1") as f:
    lines = f.readlines()
  
    # Print the column names
    first_line = lines[0].strip().split(',')
    print(first_line[0], first_line[1], first_line[2],
    first_line[3], first_line[4], first_line[5], first_line[6],
         first_line[7], first_line[8])
  
    for line in lines[1:]:
        parts = line.strip().split(',')
      
        print(first_line[0], first_line[1], first_line[2], \
    first_line[3], first_line[4], first_line[5], first_line[6],
         first_line[7], first_line[8])

        cursor.execute(
            "INSERT INTO netflix_titles VALUES (%d, %d, %d, %s, %d, %s, %s, %d, %d)",
            (first_line[0], first_line[1], first_line[2],
    first_line[3], first_line[4], first_line[5], first_line[6],
         first_line[7], first_line[8]))
