import os
import psycopg2

# Create a cursor.
pg_conn_string = os.environ["PG_CONN_STRING"]

connection = psycopg2.connect(pg_conn_string)


# Set to automatically commit each statement
connection.set_session(autocommit=True)

cursor = connection.cursor()


cursor.execute(
    "CREATE TABLE friends_data (year_of_prod STRING, season_num STRING, \
    episode_num STRING, episode_title STRING, \
    duration STRING, summary STRING, director STRING, num_stars STRING, \
    num_votes STRING)"
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
      
        print(parts[0], parts[1], parts[2], \
    parts[3], parts[4], parts[5], parts[6],
         parts[7], parts[8])

        cursor.execute(
            "INSERT INTO friends_data VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (str(parts[0]), str(parts[1]), str(parts[2]),
    parts[3], str(parts[4]), parts[5], parts[6],
         str(parts[7]), str(parts[8])))
