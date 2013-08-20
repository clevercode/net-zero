module ApplicationHelper

  def ios_touch_icon_tag(image, size)
    tag :link, rel: 'apple-touch-icon-precomposed', href: path_to_image(image), sizes: size
  end

end
