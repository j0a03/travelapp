Rails.application.routes.draw do
  # namespace é o nome da pasta
  # resources pega o conteudo do controller 

  namespace :api do
    namespace :v1 do
      resources :travels
    end
  end

end
