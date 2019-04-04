package br.com.lifetime.blotter.model;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableAsync
@EnableScheduling
public class Timer {

	private final long SEGUNDO = 1000;
	private final long MINUTO = SEGUNDO * 60;
	private final long HORA = MINUTO * 60;

	@Async
	@Scheduled(fixedDelay = SEGUNDO)
	public void verificaPorHora() {
		System.out.println("Passou 1 segundo");
	}

}
