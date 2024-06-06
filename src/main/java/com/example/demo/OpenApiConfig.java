package com.example.demo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Alibou",
                        email = "snitulescu2001@yahoo.com",
                        url = "https://www.linkedin.com/in/stefan-nitulescu-41a565184/"
                ),
                description = "OpenApi documentation for Licenta",
                title = "OpenApi specification - Licenta",
                version = "1.0",
                license = @License(
                        name = "Licence name",
                        url = "https://some-url.com"
                ),
                termsOfService = "Terms of service.ts"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                ),
        }
)
public class OpenApiConfig {
}
