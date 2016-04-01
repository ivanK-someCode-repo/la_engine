call "C:\liquibase\liquibase.bat" ^
--defaultSchemaName=public ^
--driver=org.postgresql.Driver ^
--classpath="C:\liquibase\postgresql-9.4.1208.jre6.jar" ^
--url=jdbc:postgresql://localhost:5432/engin ^
--username=postgres ^
--password=ParPar52 ^
--changeLogFile=.\changelog\base.changelog.xml ^
--logLevel=info ^
update
pause