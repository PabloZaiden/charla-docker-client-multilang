FROM microsoft/dotnet 
MAINTAINER MaxiG mrozado@lagash.com

COPY . /app 
WORKDIR /app 
RUN ["dotnet", "restore"] 
EXPOSE 5000 
ENTRYPOINT ["dotnet", "run"]
