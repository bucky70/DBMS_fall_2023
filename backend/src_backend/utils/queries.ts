
let allQueries =
{
    Query1: `SELECT DISTINCT wc.weather_condition AS Weather_Condition, 
    i.City AS City, 
    i.State AS State, 
    EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
    COUNT(i.Incident_ID) AS Number_of_Accidents, 
    ROUND(AVG(i.Severity), 2) AS Average_Severity, 
    ROUND((COUNT(i.Incident_ID) - (SELECT AVG(Number_of_Accidents) 
    FROM (SELECT COUNT(i.Incident_ID) AS Number_of_Accidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City, i.State))) * 100 / (SELECT AVG(Number_of_Accidents) 
    FROM (SELECT COUNT(i.Incident_ID) AS Number_of_Accidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City, i.State)), 2) AS Percentage_Diff_AvgAccidents, 
    ROUND((AVG(i.Severity) - (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City, i.State))) * 100 / (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City, i.State)), 2) AS Percentage_Diff_AvgSeverity 
    FROM Incident i 
    JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    JOIN Weather w ON i.Weather_ID = w.Weather_ID 
    JOIN Weather_Condition wc ON w.Weather_Condition_ID = wc.Weather_Condition_ID 
    WHERE wc.Weather_Condition IS NOT NULL AND  EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) in (DBMS) AND i.City in (DBMSCITY) AND i.State in (DBMSSTATE)
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City, i.State, wc.weather_condition ORDER BY Year, State, City, Weather_Condition`,
    Query2: `SELECT i.City AS City,i.State AS State, 
    EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
    CASE WHEN EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (2020, 2021, 2022) THEN 'Yes' ELSE 'No' END AS COVID_Status, 
    COUNT(DISTINCT i.Incident_ID) AS Number_of_Accidents, 
    ROUND(AVG(i.Severity), 2) AS Average_Severity, 
    ROUND((COUNT(DISTINCT i.Incident_ID) - (SELECT AVG(Number_of_Accidents) FROM (SELECT COUNT(DISTINCT i.Incident_ID) AS Number_of_Accidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City,i.State))) * 100 / (SELECT AVG(Number_of_Accidents) 
    FROM (SELECT COUNT(DISTINCT i.Incident_ID) AS Number_of_Accidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City,i.State)), 2) AS Percentage_Diff_AvgAccidents, 
    ROUND((AVG(i.Severity) - (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City,i.State))) * 100 / (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity FROM Incident i 
    JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), 
    i.City,i.State)), 2) AS Percentage_Diff_AvgSeverity 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    WHERE EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) in (DBMS) AND i.City in (DBMSCITY) AND i.State in (DBMSSTATE)
    GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.City,i.State
    ORDER BY Year, City, State`,
    Query3: `SELECT CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END AS Season, 
    i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
    COUNT(DISTINCT i.Incident_ID) AS Number_of_Incidents, 
    ROUND(COUNT(i.Incident_ID) * 100.0 / SUM(COUNT(i.Incident_ID)) 
    OVER (PARTITION BY CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END, i.City, i.State), 2) AS Percentage_of_Incidents, 
    ROUND((COUNT(DISTINCT i.Incident_ID) - (SELECT AVG(Number_of_Incidents) 
    FROM (SELECT COUNT(DISTINCT i.Incident_ID) AS Number_of_Incidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END, i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI'))))) * 100 / (SELECT AVG(Number_of_Incidents) 
    FROM (SELECT COUNT(DISTINCT i.Incident_ID) AS Number_of_Incidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END, i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')))), 2) AS Percentage_Diff_Avg_NoofIncidents, 
    ROUND(AVG(i.Severity),2) AS Average_Severity, ROUND((AVG(i.Severity) - (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END, i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI'))))) * 100 / (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    GROUP BY CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END, i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')))), 2) AS Percentage_Diff_Avg_Severity 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    WHERE EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) in (DBMS) AND i.City in (DBMSCITY) AND i.State in (DBMSSTATE)
    GROUP BY CASE WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (12, 1, 2) THEN 'Winter' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (3, 4, 5) THEN 'Spring' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (6, 7, 8) THEN 'Summer' 
    WHEN EXTRACT(MONTH FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) IN (9, 10, 11) THEN 'Fall' END, i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) 
    ORDER BY Year, State, City, Season`,
    Query4:`SELECT c.City AS City, 
    c.State AS State,
    c.Population_Density AS Population_Density,
    co.Latitude AS Latitude,
    co.Longitude AS Longitude,
    EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
    COUNT(DISTINCT i.Incident_ID) AS Frequency_of_Incidents, 
    ROUND(AVG(i.Severity), 2) AS Average_Severity, 
    ROUND((COUNT(DISTINCT i.Incident_ID) - (SELECT AVG(Frequency_of_Incidents) 
    FROM (SELECT COUNT(DISTINCT i.Incident_ID) AS Frequency_of_Incidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID JOIN Population c ON c.State=i.State and c.City=i.City
    GROUP BY c.Population_Density, i.City,i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI'))))) * 100 / (SELECT AVG(Frequency_of_Incidents) 
    FROM (SELECT COUNT(DISTINCT i.Incident_ID) AS Frequency_of_Incidents 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID  JOIN Population c ON c.State=i.State and c.City=i.City
    GROUP BY c.Population_Density, i.City,i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')))), 2) AS Percentage_Diff_AvgFreqIncidents, 
    ROUND((AVG(i.Severity) - (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity 
    FROM Incident i JOIN Incident_times it ON i.Incident_ID = it.Incident_ID JOIN Population c ON c.State=i.State and c.City=i.City
    GROUP BY c.Population_Density, i.City, i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI'))))) * 100 / (SELECT AVG(Average_Severity) 
    FROM (SELECT AVG(i.Severity) AS Average_Severity FROM Incident i 
    JOIN Incident_times it ON i.Incident_ID = it.Incident_ID JOIN Population c ON c.State=i.State and c.City=i.City
    GROUP BY c.Population_Density, i.City,i.State, EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')))), 2) AS Percentage_Diff_AvgSeverity 
    FROM Population c
    JOIN Incident i ON i.City = c.City and i.State=c.State 
    JOIN Incident_times it ON i.Incident_ID = it.Incident_ID 
    JOIN location l ON c.location_id = l.location_id
    JOIN address a ON l.location_id = a.location_id
    JOIN Coordinate co on co.Address_ID = a.Address_ID
    WHERE EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) in (DBMS) AND i.City || ':' || i.state in (DBMSCITYSTATE)
    GROUP BY c.Population_Density, c.City,c.State, co.Latitude,co.Longitude,
    EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) 
    ORDER BY Year, c.Population_Density, City, State`,
    Query5: `SELECT State, Year, 'Bump' As Road_Type, Avg_Severity, Count
    FROM (
      SELECT i.State as State, 
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Bump = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State, Year, 'Crossing', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Crossing = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State,Year, 'Junction', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Junction = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State,Year,'Roundabout', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Roundabout = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT  State,Year, 'Give_way', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Give_way = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT  State,Year, 'No_exit', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.No_exit = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')),i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State,Year, 'Railway', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Railway = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT  State,Year, 'Station', Avg_Severity, Count
    FROM (
      SELECT  i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Station = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State,Year, 'Stop', Avg_Severity, Count
    FROM (
      SELECT  i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Stop = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')), i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State,Year, 'Traffic_signal', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Traffic_signal = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')),i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    UNION
    SELECT State,Year, 'Turning_loop', Avg_Severity, Count
    FROM (
      SELECT i.State as State,
      EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) AS Year, 
      ROUND(AVG(i.Severity), 2) AS Avg_Severity, 
      SUM(CASE WHEN rt.Turning_loop = 'TRUE' THEN 1 ELSE 0 END) AS Count
      FROM Road_Type rt
      JOIN Affected_By ab ON rt.Feature_ID = ab.Feature_ID
      JOIN Incident i ON ab.Incident_ID = i.Incident_ID
      JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
      GROUP BY EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')),i.State
    )
    WHERE Count <> 0 AND State in (Q5STATE) AND Year IN (DBMS)
    ORDER BY Year`,
    Query6: `SELECT i.City, i.State, TO_CHAR(TO_DATE(IT.StartTime, 'YYYY-MM-DD HH24:MI:SS'), 'HH24') AS Hour, 
    COUNT(i.Incident_ID) AS Num_Incidents
    FROM Incident i
    JOIN Incident_times it ON i.Incident_ID = it.Incident_ID
    WHERE EXTRACT(YEAR FROM TO_DATE(it.StartTime, 'YYYY-MM-DD HH24:MI')) in (DBMS) AND i.City in (DBMSCITY) AND i.State in (DBMSSTATE)
    GROUP BY i.City, i.State, TO_CHAR(TO_DATE(IT.StartTime, 'YYYY-MM-DD HH24:MI:SS'), 'HH24')
    ORDER BY Hour`,
    Query7:`select city,state from incident group by city, state`,
    Query8:`SELECT
    (SELECT COUNT(*) FROM ADDRESS) +
    (SELECT COUNT(*) FROM AFFECTED_BY) +
    (SELECT COUNT(*) FROM COORDINATE) +
    (SELECT COUNT(*) FROM INCIDENT) +
    (SELECT COUNT(*) FROM INCIDENT_TIMES) +
    (SELECT COUNT(*) FROM INVOLVES) +
    (SELECT COUNT(*) FROM LOCATION) +
    (SELECT COUNT(*) FROM ROAD_FEATURE) +
    (SELECT COUNT(*) FROM ROAD_TYPE) +
    (SELECT COUNT(*) FROM WEATHER) +
    (SELECT COUNT(*) FROM WEATHER_CONDITION) +
    (SELECT COUNT(*) FROM POPULATION) AS total_count from DUAL`,
    Query9: `SELECT 'ADDRESS' AS table_name, COUNT(*) AS table_count FROM ADDRESS
    UNION
    SELECT 'AFFECTED_BY' AS table_name, COUNT(*) AS table_count FROM AFFECTED_BY
    UNION
    SELECT 'COORDINATE' AS table_name, COUNT(*) AS table_count FROM COORDINATE
    UNION
    SELECT 'INCIDENT' AS table_name, COUNT(*) AS table_count FROM INCIDENT
    UNION
    SELECT 'INCIDENT_TIMES' AS table_name, COUNT(*) AS table_count FROM INCIDENT_TIMES
    UNION
    SELECT 'INVOLVES' AS table_name, COUNT(*) AS table_count FROM INVOLVES
    UNION
    SELECT 'LOCATION' AS table_name, COUNT(*) AS table_count FROM LOCATION
    UNION
    SELECT 'ROAD_FEATURE' AS table_name, COUNT(*) AS table_count FROM ROAD_FEATURE
    UNION
    SELECT 'ROAD_TYPE' AS table_name, COUNT(*) AS table_count FROM ROAD_TYPE
    UNION
    SELECT 'WEATHER' AS table_name, COUNT(*) AS table_count FROM WEATHER
    UNION
    SELECT 'WEATHER_CONDITION' AS table_name, COUNT(*) AS table_count FROM WEATHER_CONDITION
    UNION
    SELECT 'POPULATION' AS table_name, COUNT(*) AS table_count FROM POPULATION`
}

export {allQueries};