call "C:\liquidbase\liquibase.bat" ^
--defaultSchemaName=public ^
--driver=org.postgresql.Driver ^
--classpath="C:\liquidbase\postgresql-9.4.1208.jre6.jar" ^
--url=jdbc:postgresql://localhost:5432/engin ^
--username=postgres ^
--password=ParPar52 ^
--changeLogFile=.\changelog\changelog.xml ^
--logLevel=info ^
update
pause