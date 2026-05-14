package com.admr.admrconect.repository;

import com.admr.admrconect.model.Notificacao;
import com.admr.admrconect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {

    List<Notificacao> findByDestinatario(Usuario destinatario);

    List<Notificacao> findByDestinatarioAndLidaFalse(Usuario destinatario);

    long countByDestinatarioAndLidaFalse(Usuario destinatario);
}
