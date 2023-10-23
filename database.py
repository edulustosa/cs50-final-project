import sqlite3


def get_data(sql_query, parameters=None):
    """Get data from the database"""

    try:
        conn = sqlite3.connect("chat.db")
        cursor = conn.cursor()

        if parameters:
            cursor.execute(sql_query, parameters)
        else:
            cursor.execute(sql_query)

        data = cursor.fetchall()
        return data
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
        return None
    finally:
        if conn:
            conn.close()


def commit(sql_query, parameters=None):
    """Insert data in database"""

    try:
        conn = sqlite3.connect("chat.db")
        cursor = conn.cursor()

        if parameters:
            cursor.execute(sql_query, parameters)
        else:
            cursor.execute(sql_query)

        conn.commit()
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
        return None
    finally:
        if conn:
            conn.close()
