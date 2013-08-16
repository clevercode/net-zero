NetZero::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root :to => 'pages#netZero'
  get 'netZero' => 'pages#netZero'
  get 'velocity' => 'pages#velocity'
  get 'index' => 'pages#index'
end
