Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'static_pages#home'

  resources :rooms, only: [:show, :new, :create, :update] do
    patch :reset, on: :member
  end

  resources :pieces, only: [:create, :new]
  # mount ActionCable.server => '/cable'
end
