package com.admr.admrconect.service;

import com.admr.admrconect.model.Notificacao;
import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository repository;

    // Envia uma notificacao para um usuario
    public Notificacao enviar(Usuario destinatario, String tipo, String mensagem) {
        Notificacao n = new Notificacao();
        n.setDestinatario(destinatario);
        n.setTipo(tipo);
        n.setMensagem(mensagem);
        n.setLida(false);
        return repository.save(n);
    }

    public List<Notificacao> listar() {
        return repository.findAll();
    }

    // Marca todas as notificacoes de um usuario como lidas
    public void marcarTodasLidas(Usuario usuario) {
        List<Notificacao> naoLidas = repository.findByDestinatarioAndLidaFalse(usuario);
        naoLidas.forEach(n -> n.setLida(true));
        repository.saveAll(naoLidas);
    }
}
