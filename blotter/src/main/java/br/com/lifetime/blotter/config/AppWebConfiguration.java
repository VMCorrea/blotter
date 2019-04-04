package br.com.lifetime.blotter.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import br.com.lifetime.blotter.api.OperacaoRestController;
import br.com.lifetime.blotter.controller.MainController;
import br.com.lifetime.blotter.dao.OperacaoDAO;
import br.com.lifetime.blotter.service.OperacaoService;

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses= {MainController.class, OperacaoDAO.class, OperacaoRestController.class, OperacaoService.class})
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
}
