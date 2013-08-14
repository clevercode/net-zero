LiveChat::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root :to => 'pages#blank'
  get 'chat' => 'pages#chat'
  get 'dayView' => 'pages#dayView'
  get 'schedule' => 'pages#schedule'
end
