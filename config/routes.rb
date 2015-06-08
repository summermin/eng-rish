Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
    resources :users, only: [:index, :show] do
      get "/get_tweets" => 'users#get_tweets'
    end
    root 'users#index'

end
