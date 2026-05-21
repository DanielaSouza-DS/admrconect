package com.admr.admrconect.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "ADMR Conect API - funcionando! "
                + "Endpoints: /api/usuarios | /api/clientes "
                + "| /api/produtos | /api/pedidos | /api/ligacoes";
    }
}
