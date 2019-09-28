Rails.application.routes.draw do
  get    '/getdata',    to: 'application#getdata'
  # get '/list'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
