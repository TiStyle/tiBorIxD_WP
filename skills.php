<!-- SKILLS QUERY HERE -->
<?php

    /*
    * Check if a maximum is defined, otherwise show all items
    */ 
    if($max_skill_amount){
        $max_skill_amount = $max_skill_amount;
    } else{
        $max_skill_amount = -1;
    }

    $skills = wp_get_recent_posts(array(
        'numberposts' => $max_skill_amount,
        'post_status' => 'publish',
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'post_type' => 'skill',
    ));
    foreach($skills as $skill) : ?>

    <div class="skill">
        <div class="skill-icon">
            <?php
                if( get_field('skill_icon', $skill['ID'])) :
                    echo the_field('skill_icon', $skill['ID']);
                endif;
            ?>
        </div>
        
        <div class="skill-bar">
            <?php 
                if( get_field('skill_value', $skill['ID']) ) :
                $skill_value = get_field('skill_value', $skill['ID']);
                // echo str_repeat('<div class="value" data-id="'.$skill['ID'].'"></div>', $skill_value);
                echo str_repeat('<div class="value"></div>', $skill_value);
            
                endif; 
            ?>
        </div>

        <div class="skill-meta">
            <h3><?php echo $skill['post_title']; ?></h3>
            
            <hr>

            <div class="skill-info">
                <?php echo $skill['post_content']; ?>
            </div>
        </div>
    </div>
    
    <?php endforeach; wp_reset_query(); ?>


    <script>
        document.addEventListener("DOMContentLoaded", function () {
            if(!document.body.classList.contains('home')){
                var skillsBar = Array.from(document.querySelectorAll('.skill-bar'));
                skillsBar.forEach(skillbar => i = new Skill(skillbar));
            }
        });
    </script>
<!-- SKILLS QUERY END -->