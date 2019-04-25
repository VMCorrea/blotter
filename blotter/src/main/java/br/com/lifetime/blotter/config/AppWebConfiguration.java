package br.com.lifetime.blotter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import br.com.lifetime.blotter.api.OperacaoRestController;
import br.com.lifetime.blotter.controller.OperacaoController;
import br.com.lifetime.blotter.dao.OperacaoDaoImpl;
import br.com.lifetime.blotter.service.OperacaoService;

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = { OperacaoDaoImpl.class, OperacaoRestController.class, OperacaoService.class, OperacaoController.class })
public class AppWebConfiguration implements WebMvcConfigurer {

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		registry.jsp("/WEB-INF/views/", ".jsp");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("classpath:/statics/");
	}

	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {

		configurer.setUseTrailingSlashMatch(true);
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver multipartResolver() {

		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();

		return multipartResolver;
	}

}
