package com.admr.admrconect.controller;

import com.admr.admrconect.model.Ligacao;
import com.admr.admrconect.service.LigacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ligacoes")
public class LigacaoController {

    @Autowired
    private LigacaoService service;

    @GetMapping
    public List<Ligacao> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Ligacao buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ligacao salvar(@RequestBody Ligacao ligacao) {
        return service.salvar(ligacao);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
