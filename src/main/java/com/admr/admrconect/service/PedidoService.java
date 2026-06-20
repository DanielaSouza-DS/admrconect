package com.admr.admrconect.service;

import com.admr.admrconect.enums.StatusPedido;
import com.admr.admrconect.model.Cliente;
import com.admr.admrconect.model.Pedido;
import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.ClienteRepository;
import com.admr.admrconect.repository.PedidoRepository;
import com.admr.admrconect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Pedido salvar(Pedido pedido) {
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente nao encontrado"));
        Usuario vendedor = usuarioRepository.findById(pedido.getVendedor().getId())
                .orElseThrow(() -> new RuntimeException("Vendedor nao encontrado"));

        pedido.setCliente(cliente);
        pedido.setVendedor(vendedor);

        return repository.save(pedido);
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Pedido buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido nao encontrado: id=" + id));
    }

    public List<Pedido> listarPorStatus(StatusPedido status) {
        return repository.findByStatus(status);
    }

    public Pedido avancarStatus(Long id) {
        Pedido pedido = buscar(id);
        pedido.avancarStatus();
        return repository.save(pedido);
    }

    public void deletar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}