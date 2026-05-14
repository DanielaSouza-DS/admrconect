package com.admr.admrconect.controller;

import com.admr.admrconect.enums.StatusPedido;
import com.admr.admrconect.model.Pedido;
import com.admr.admrconect.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService service;

    @GetMapping
    public List<Pedido> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Pedido buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @GetMapping("/status/{status}")
    public List<Pedido> listarPorStatus(@PathVariable StatusPedido status) {
        return service.listarPorStatus(status);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pedido salvar(@RequestBody Pedido pedido) {
        return service.salvar(pedido);
    }


    @PutMapping("/{id}/avancar-status")
    public Pedido avancarStatus(@PathVariable Long id) {
        return service.avancarStatus(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
